import { render, screen } from 'tests/testUtils';
import Layout from 'components/Layout';

describe('Layout', () => {
  it('should render the header with correct title', () => {
    const title = 'Title';
    render(<Layout title={title}>Home Content</Layout>);

    const heading = screen.getByRole('heading');

    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(`Task Management > ${title}`);
  });
});
