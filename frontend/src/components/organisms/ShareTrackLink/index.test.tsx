import React from 'react';
import { render, screen } from '@testing-library/react';
import { ShareTractLink } from '.';


describe('ShareTrackLink', () => {
  test('renders modal with correct content', () => {
  
    render(<ShareTractLink open={true} onClose={jest.fn()} />);

    const shareText = screen.getByText('Share tracking link');
    const image = screen.getByAltText('image loading');
    const emailIcon = screen.getByText('Email');
    const copyIcon = screen.getByText('Copy');
    const descriptionText = screen.getByText('Share the link above, and they can securely track this transfer.');

    expect(shareText).toBeInTheDocument();
    expect(image).toBeInTheDocument();
    expect(emailIcon).toBeInTheDocument();
    expect(copyIcon).toBeInTheDocument();
    expect(descriptionText).toBeInTheDocument();
  });

  test('modal is closed when onClose is called', () => {
    const onCloseMock = jest.fn();
    render(<ShareTractLink open={true} onClose={onCloseMock} />);
    onCloseMock();
    expect(onCloseMock).toHaveBeenCalled();
  });
});
