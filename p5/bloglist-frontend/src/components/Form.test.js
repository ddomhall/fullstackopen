import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Form from './Form'

test('eventHandler called', async () => {
    const user = userEvent.setup()

    render(<Form errormessage={'error'} formAction={jest.fn()} fields={['title', 'author']} title={'add blog'} />)

    const button = screen.getByText('show')
    await user.click(button)

    const title = screen.getByPlaceholderText('title')
    const author = screen.getByPlaceholderText('author')
    const submit = screen.getByDisplayValue('add blog')

    user.type(title, 'title1')
    user.type(author, 'author1')
    user.click(submit)
})
