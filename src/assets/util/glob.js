import { sync } from 'fast-glob';

export function getDirectories({ path, root, depth }) {
  const pattern = depth ? `${path}/**/*` : `${path}/*`;
  return sync(pattern, {
    ignore: [ 'node_modules' ],
    onlyDirectories: true,
    cwd: root,
    depth,
  });
}