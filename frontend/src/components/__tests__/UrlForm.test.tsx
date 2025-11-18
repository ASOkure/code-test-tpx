import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import UrlForm from '../UrlForm';
import * as api from '../../api/urlApi';

jest.mock('../../api/urlApi');

describe('UrlForm', () => {
    test('submits the form and calls onUrlCreated', async () => {
        const mockOnCreated = jest.fn();
        const created = { alias: 'abc', fullUrl: 'https://example.com', shortUrl: '/abc' };
        (api.createShortUrl as jest.Mock).mockResolvedValue(created);

        render(<UrlForm onUrlCreated={mockOnCreated} />);

        const urlInput = screen.getByPlaceholderText(/enter full url/i);
        const aliasInput = screen.getByPlaceholderText(/custom alias/i);
        const submitButton = screen.getByRole('button', { name: /shorten/i });

        fireEvent.change(urlInput, { target: { value: 'https://example.com' } });
        fireEvent.change(aliasInput, { target: { value: 'abc' } });
        fireEvent.click(submitButton);

        await waitFor(() => expect(api.createShortUrl).toHaveBeenCalled());

        expect(mockOnCreated).toHaveBeenCalledWith(created);
    });
});
