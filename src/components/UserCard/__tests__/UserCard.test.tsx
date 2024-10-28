import { render, screen, fireEvent } from '@/test-utils';
import { UserCard } from '../index';

const mockToggleFavorite = jest.fn();
jest.mock('@/hooks/useFavorites', () => ({
  useFavorites: () => ({
    isFavorite: jest.fn().mockImplementation((id: number) => id === 1),
    toggleFavorite: mockToggleFavorite,
  }),
}));

const mockUser = {
  id: 1,
  login: 'testuser',
  avatar_url: 'https://example.com/avatar.jpg',
  html_url: 'https://github.com/testuser',
  name: 'Test User',
  bio: null,
  public_repos: 10,
  followers: 20,
  following: 30,
};

describe('UserCard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders user information correctly', () => {
    render(<UserCard user={mockUser} />);

    expect(screen.getByText(mockUser.login)).toBeInTheDocument();
    expect(screen.getByText('Ver en GitHub')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('alt', `${mockUser.login}'s avatar`);
  });

  it('has correct links', () => {
    render(<UserCard user={mockUser} />);

    expect(screen.getByText('Ver en GitHub')).toHaveAttribute('href', mockUser.html_url);
    expect(screen.getByText(mockUser.login)).toHaveAttribute('href', `/users/${mockUser.login}`);
  });

  it('shows favorite status correctly', () => {
    render(<UserCard user={mockUser} />);

    const favoriteButton = screen.getByRole('button');
    expect(favoriteButton).toHaveClass('favorite');
    expect(favoriteButton).toHaveAttribute('aria-label', 'Eliminar de favoritos');
  });

  it('shows non-favorite status correctly', () => {
    render(<UserCard user={{ ...mockUser, id: 2 }} />);

    const favoriteButton = screen.getByRole('button');
    expect(favoriteButton).not.toHaveClass('favorite');
    expect(favoriteButton).toHaveAttribute('aria-label', 'Agregar a favoritos');
  });

  it('calls toggleFavorite when clicking the favorite button', () => {
    render(<UserCard user={mockUser} />);

    const favoriteButton = screen.getByRole('button');
    fireEvent.click(favoriteButton);

    expect(mockToggleFavorite).toHaveBeenCalledWith(mockUser.id);
  });

  it('renders avatar with correct dimensions', () => {
    render(<UserCard user={mockUser} />);

    const avatar = screen.getByRole('img');
    expect(avatar).toHaveAttribute('width', '80');
    expect(avatar).toHaveAttribute('height', '80');
  });

  it('renders external link with correct attributes', () => {
    render(<UserCard user={mockUser} />);

    const githubLink = screen.getByText('Ver en GitHub');
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
