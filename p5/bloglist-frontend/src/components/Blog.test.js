import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
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
