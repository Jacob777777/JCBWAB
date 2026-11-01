// 內文每隔 N 個段落插入一個廣告預留位 <div id="adsense-slot">
export default function rehypeAdSlots({ every = 3 } = {}) {
  return (tree) => {
    const out = [];
    let count = 0;
    for (const node of tree.children) {
      out.push(node);
      if (node.type === 'element' && node.tagName === 'p') {
        count++;
        if (count % every === 0) {
          out.push({
            type: 'element',
            tagName: 'div',
            properties: { id: 'adsense-slot', className: ['ad-slot'] },
            children: [],
          });
        }
      }
    }
    tree.children = out;
  };
}

