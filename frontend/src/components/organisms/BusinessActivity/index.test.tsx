import { act, fireEvent,  screen } from '@testing-library/react';
import React from 'react';
import { BusinessActivity } from '.';
import { getMyData, postMyData } from '/src/services';
import { render } from '/src/test-setUp';
import { Provider } from 'react-redux';
import store from '/src/store';

jest.mock('/src/services', () => ({
  getCategories: jest.fn().mockImplementation((url) => {
      return Promise.resolve({
        data: [
          {
            id: 1,
            name: 'Design, marketing or communication',
          },
        ],
      });
  }),
  getSubCategories: jest.fn().mockImplementation((url) => {
    return Promise.resolve({
      data: [
        {
          id: 1,
          name: 'Real estate sale, purchase and management',
        },
      ],
    });
})
}));

describe('BusinessActivity', () => {
  test('render title correctly', async () => {
    await act(async () => {
      render(<Provider store={store}><BusinessActivity /></Provider>);
    });
      const title = screen.getByText('Help us verify account faster');
      expect(title).toBeInTheDocument();

      const selectCategoryTextElements = screen.getAllByLabelText('Category');
      const selectCategoryText = selectCategoryTextElements[0] as HTMLSelectElement;
      fireEvent.keyDown(selectCategoryText, { key: 'ArrowDown' });
      fireEvent.click(screen.getByText('Design, marketing or communication'));
   
        const element=screen.getAllByLabelText("Subcategory");
        const text=element[0] as HTMLSelectElement;
        fireEvent.keyDown(text,{key:"ArrowDown"});
        fireEvent.click(screen.getByText("Real estate sale, purchase and management"));

        const element2=screen.getAllByLabelText("Size of your business");
        const text2=element2[0] as HTMLSelectElement;
        fireEvent.keyDown(text2,{key:"ArrowDown"});
        fireEvent.click(screen.getByText("50-100"));
       
        await act(async () => {
            fireEvent.click(screen.getByText('Continue'));
          });
  });
});
