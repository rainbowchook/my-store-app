import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SignIn from './SignIn'

describe('SignIn form', () => {
    it('should allow a registered user to sign in', async () => {

    })

    it('should not allow a non-registered user to sign in', async () => {
        render(<SignIn />)

        await userEvent.type(screen.getByLabelText(/Email Address/i), 'test@test.com')
        await userEvent.type(screen.getByLabelText(/password/i), 'testing123')
        
        userEvent.click(screen.getByRole('button', { name: /submit/i }))

        expect(await screen.findByText(/unable to sign in/i)).toBeVisible()
    })
})