import { render, screen } from '@testing-library/react';
import { LoginSignup } from '.';

describe('LoginSignup', () => {
  it('renders the LoginSignup component with the provided head and children', () => {
    render(
      <LoginSignup
        head={<h1>Login/Signup</h1>}
        children={<div>Content</div>}
      />
    );

    expect(screen.getByText('Login/Signup')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  
});
