// 圖片佔位符防呆：移除尚未替換的「請搜尋圖庫：」佔位圖，並在終端機提醒。
// 兩種情況都會處理：
//   1. 成功解析成 <img src="請搜尋圖庫：...">（關鍵字沒有空格時）
//   2. 因關鍵字含空格，Markdown 未解析成圖片，而以純文字 ![描述](請搜尋圖庫：...) 殘留
const MARKER = '請搜尋圖庫';
const RAW_PATTERN = /!\[[^\]]*\]\(\s*請搜尋圖庫[：:][^)]*\)/g;

const isBlank = (node) =>
  node.type === 'text' ? node.value.trim() === '' : false;

export default function rehypeImagePlaceholder() {
  return (tree, file) => {
    let removed = 0;

    const clean = (node) => {
      if (!node.children) return;
      node.children = node.children.filter((child) => {
        if (
          child.type === 'element' &&
          child.tagName === 'img' &&
          String(child.properties?.src ?? '').includes(MARKER)
        ) {
          removed++;
          return false;
        }
        return true;
      });
      for (const child of node.children) {
        if (child.type === 'text' && RAW_PATTERN.test(child.value)) {
          RAW_PATTERN.lastIndex = 0;
          removed += (child.value.match(RAW_PATTERN) ?? []).length;
          child.value = child.value.replace(RAW_PATTERN, '');
        }
        RAW_PATTERN.lastIndex = 0;
        clean(child);
      }
      // 只含空白的段落（原本只放了圖片）一併移除
      node.children = node.children.filter(
        (child) =>
          !(
            child.type === 'element' &&
            child.tagName === 'p' &&
            child.children.every(isBlank)
          ),
      );
    };

    clean(tree);

    if (removed > 0) {
      const name = (file?.path ?? '').split(/[\\/]/).pop() || '未知檔案';
      console.warn(
        `\x1b[33m提醒：文章 ${name} 還有未替換的圖片佔位符（${removed} 處，已在網頁上隱藏）\x1b[0m`,
      );
    }
  };
}

