/** 移除 Markdown/MDX 語法後截取前 N 字，作為缺漏 description 的備援 */
export function excerpt(body: string | undefined, length = 100): string {
  const text = (body ?? '')
    .replace(/^import .*$/gm, '')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/[*_`>~|-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return Array.from(text).slice(0, length).join('');
}

export const SITE_NAME = 'JCB情報站';
export const SITE_DESC = '精選評測、比較與購買指南，幫你做出聰明的消費決策。';

