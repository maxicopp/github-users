import { render, screen } from '@testing-library/react';
import { UserList } from '../index';
import { GitHubUser } from '@/types/github';

jest.mock('@/components/UserCard', () => ({
  UserCard: ({ user }: { user: GitHubUser }) => (
    <div data-testid="user-card">{user.login}</div>
  ),
}));

jest.mock('react-loading-skeleton', () => ({
  __esModule: true,
  default: function Skeleton({
    circle,
    width,
    height
  }: {
    circle?: boolean;
    width?: string | number;
    height?: string | number;
  }) {
    return (
      <div
        data-testid="skeleton"
        style={{ width, height, borderRadius: circle ? '50%' : undefined }}
      />
    );
  },
}));

const mockUsers: GitHubUser[] = [
  {
    id: 1,
    login: 'user1',
    avatar_url: 'https://example.com/avatar1.jpg',
    html_url: 'https://github.com/user1',
    name: 'User One',
    bio: 'Bio 1',
    public_repos: 10,
    followers: 20,
    following: 30,
  },
  {
    id: 2,
    login: 'user2',
    avatar_url: 'https://example.com/avatar2.jpg',
    html_url: 'https://github.com/user2',
    name: 'User Two',
    bio: 'Bio 2',
    public_repos: 15,
    followers: 25,
    following: 35,
  },
];

describe('UserList', () => {
  it('should render loading skeletons when loading is true', () => {
    render(<UserList
      users={[]}
      loading={true}
      hasMore={false}
      onLoadMore={() => {}}
    />);

    const skeletonCards = screen.getAllByTestId('skeleton-card');
    expect(skeletonCards).toHaveLength(6);
  });

  it('should render empty message when no users are provided', () => {
    render(<UserList
      users={[]}
      loading={false}
      hasMore={false}
      onLoadMore={() => {}}
    />);

    expect(screen.getByText('No se encontraron usuarios.')).toBeInTheDocument();
  });

  it('should render user cards for each user', () => {
    render(<UserList
      users={mockUsers}
      loading={false}
      hasMore={false}
      onLoadMore={() => {}}
    />);

    const userCards = screen.getAllByTestId('user-card');
    expect(userCards).toHaveLength(mockUsers.length);

    mockUsers.forEach(user => {
      expect(screen.getByText(user.login)).toBeInTheDocument();
    });
  });

  it('should render correct number of skeleton cards while loading', () => {
    render(<UserList
      users={[]}
      loading={true}
      hasMore={false}
      onLoadMore={() => {}}
    />);

    const skeletons = screen.getAllByTestId('skeleton');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it('should not render user cards while loading', () => {
    render(<UserList
      users={[]}
      loading={true}
      hasMore={false}
      onLoadMore={() => {}}
    />);

    const userCards = screen.queryAllByTestId('user-card');
    expect(userCards).toHaveLength(0);
  });

  it('should render in a grid layout', () => {
    render(<UserList
      users={mockUsers}
      loading={false}
      hasMore={false}
      onLoadMore={() => {}}
    />);

    const grid = screen.getByTestId('user-grid');
    expect(grid).toHaveClass('grid');
  });
});
