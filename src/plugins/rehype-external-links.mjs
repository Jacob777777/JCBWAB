// 為所有外部連結（http/https 且非本站）自動加上 target 與 rel
export default function rehypeExternalLinks({ hosts = [] } = {}) {
  const isExternal = (href) => {
    if (typeof href !== 'string') return false;
    if (!/^(https?:)?\/\//i.test(href)) return false;
    try {
      const { hostname } = new URL(href, 'https://placeholder.invalid');
      return !hosts.includes(hostname);
    } catch {
      return false;
    }
  };
  const walk = (node) => {
    if (node.type === 'element' && node.tagName === 'a' && isExternal(node.properties?.href)) {
      node.properties.target = '_blank';
      node.properties.rel = ['sponsored', 'nofollow', 'noopener'];
    }
    node.children?.forEach(walk);
  };
  return (tree) => walk(tree);
}

