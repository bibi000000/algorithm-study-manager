import os
import requests
from github import Github

# First create a Github instance:

# using an access token
g = Github(os.environ["KYR_ACCESS_TOKEN"])

# # Github Enterprise with custom hostname
# g = Github(base_url="https://{hostname}/api/v3", login_or_token="access_token")

# Then play with your Github objects:
for repo in g.get_user().get_repos():
    print(repo.name)


result = requests.post(
    headers={
        'Accept': 'application/vnd.github_json',
        'Authorization': f'Bearer {os.environ["KYR_ACCESS_TOKEN"]}',
        'X-GitHub-Api-Version': '2022-11-28',
    },
    url='https://api.github.com/repos/poundly/algorithm-study-manager/commits/COMMIT_SHA/comments',
    data='{"body":"Great stuff","path":"file1.txt","position":4,"line":1}'
)

print(result)
print(result.content)

file_name = "README.md"
file = open(f'{file_name}', 'a')
file.write(result.content)
file.close()


