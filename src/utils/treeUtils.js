export const flattenTreeForDropdown = (nodes, depth = 0, list = []) => {
  if (!nodes) return list;

  nodes.forEach((node) => {
    list.push({
      id: node.id,
      name: node.name,
      depth: depth,
      label: `${"\u00A0\u00A0".repeat(depth * 2)}${depth > 0 ? "└ " : ""}${node.name}`,
    });

    if (node.children && node.children.length > 0) {
      flattenTreeForDropdown(node.children, depth + 1, list);
    }
  });

  return list;
};

/**
 * Finds the path (breadcrumbs) from a given node up to the root.
 * @param {Array} tree The full tree data.
 * @param {string|number} nodeId The ID of the node to find the path for.
 * @returns {Array} An array of nodes representing the path, from root to the selected node.
 */
export const findPathToNode = (tree, nodeId) => {
  if (!tree || !nodeId) return [];

  let path = [];

  function traverse(nodes, currentPath = []) {
    for (const node of nodes) {
      const newPath = [...currentPath, { id: node.id, name: node.name }];
      if (node.id === nodeId) {
        path = newPath;
        return true; // Found the node
      }
      if (node.children && node.children.length > 0) {
        if (traverse(node.children, newPath)) {
          return true;
        }
      }
    }
    return false;
  }

  traverse(tree);
  return path;
};
