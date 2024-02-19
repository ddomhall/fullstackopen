import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('title & author but not likes', () => {
    const blog = {
        title: 'title1',
        author: 'author1',
        likes: 1
    }

    render(<Blog blog={blog} likeBlog={jest.fn()} removeBlog={jest.fn()} />)

    screen.getByText('title:', {exact: false})
    screen.getByText('author:', {exact: false})
    const likes = screen.queryByText('likes:', {exact: false})
    expect(likes).toBe(null)
})

test('likes show on expand', async () => {
    const blog = {
        title: 'title1',
        author: 'author1',
        likes: 1,
        user: {
            name: 'name1'
        }
    }

    render(<Blog blog={blog} likeBlog={jest.fn()} removeBlog={jest.fn()} />)

    let likes = screen.queryByText('likes:', {exact: false})
    expect(likes).toBe(null)

    const button = screen.getByText('expand')
    const user = userEvent.setup()
    await user.click(button)

    likes = screen.getByText('likes:', {exact: false})
})

test('likes click twice', async () => {
    const blog = {
        title: 'title1',
        author: 'author1',
        likes: 1,
        user: {
            name: 'name1'
        }
    }
    const mockHandler = jest.fn()

    render(<Blog blog={blog} likeBlog={mockHandler} removeBlog={jest.fn()} />)

    const button = screen.getByText('like')
    const user = userEvent.setup()
    await user.click(button)
    await user.click(button)

    expect(mockHandler.mock.calls).toHaveLength(2)
})
