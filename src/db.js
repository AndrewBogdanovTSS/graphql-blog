export default {
  users: [
    {
      id: '1',
      name: 'Andrew',
      email: 'andrew@example.com',
      age: 27
    }, {
      id: '2',
      name: 'Sarah',
      email: 'sarah@example.com'
    }, {
      id: '3',
      name: 'Mike',
      email: 'mike@example.com'
    }
  ],
  posts: [
    {
      id: '10',
      title: 'GraphQL 101',
      body: 'This is how to use GraphQL...',
      published: true,
      author: '1',
      comments: ['1', '2']
    },
    {
      id: '11',
      title: 'GraphQL 201',
      body: 'This is an advanced GraphQL post...',
      published: false,
      author: '1',
      comments: ['4', '5']
    },
    {
      id: '3',
      title: 'Programming Music',
      body: '',
      published: false,
      author: '2',
      comments: ['1']
    },
    {
      id: '2',
      title: 'Programming Music',
      body: '',
      published: true,
      author: '2',
      comments: ['1']
    },
    {
      id: '1',
      title: 'Programming Music',
      body: '',
      published: false,
      author: '2',
      comments: ['1']
    }
  ],
  comments: [
    {
      id: '1',
      text: 'Comment 1',
      post: '1',
      author: '1'
    },
    {
      id: '2',
      text: 'Comment 2',
      post: '11',
      author: '1'
    },
    {
      id: '3',
      text: 'Comment 3',
      post: '10',
      author: '2'
    },
    {
      id: '4',
      text: 'Comment 4',
      post: '2',
      author: '3'
    },
    {
      id: '5',
      text: 'Comment 5',
      post: '3',
      author: '2'
    }
  ]
}
