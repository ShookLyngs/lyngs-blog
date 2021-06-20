/*import http from '@/modules/api';*/

/*const username = 'ShookLyngs';*/

export function getRepositories(/*{ type = 'owner', sort = 'updated' } = {}*/) {
  return new Promise(resolve => {
    setTimeout(() => resolve({
      data: [
        { name: 'Repository', description: 'Description of the repository, some of them would be too long to display, so we cut the text if the description was too long.', },
        { name: 'Name', description: 'Description of the repository', },
        { name: 'Name', description: 'Description of the repository', },
        { name: 'Name', description: 'Description of the repository', },
        { name: 'Name', description: 'Description of the repository', },
      ],
    }), 1500);
  });
  /*return http({
    url: `https://api.github.com/users/${username}/repos`,
    params: {
      type,
      sort,
    },
  });*/
}