import { render, screen } from 'tests/testUtils';
import Header from 'components/Layout/Header';

describe('Home', () => {
  it('should display the correct title', () => {
    const title = 'Home';
    render(<Header title={title} />);

    const heading = screen.getByRole('heading');

    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(`Task Management > ${title}`);
  });
});
