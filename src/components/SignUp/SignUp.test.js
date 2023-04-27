import { fireEvent, render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import fetchMock from 'jest-fetch-mock'
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import * as firebase from '../../utils/firebase.utils';
import SignUp from './SignUp'
import { AuthProvider } from '../../contexts/AuthContext';

const testUser1 = {
    firstName: 'Test',
    lastName: 'User',
    password: 'testing123'
}

const originalEnv = process.env
/* DON'T MOCK FIREBASE with jest-fetch-mock.  USE https://github.com/soumak77/firebase-mock */
jest.mock('firebase/app', () => {
    const auth = jest.fn().mockReturnValueOnce({
        createUserWithEmailAndPassword: jest.fn().mockResolvedValueOnce({
            user: {
                uid: 'GxCje2YSEePbRK7TOvp0vKtynur2'
            }
        })
    })
})

jest.mock('firebase/firestore', () => {
    const app = jest.fn().mockReturnValueOnce({

    })
})

describe('SignUp form', () => {
    beforeAll(() => {
        fetchMock.enableMocks()
        process.env = {
            REACT_APP_FIREBASE_API_KEY:'FAKE_API_KEY',
            REACT_APP_FIREBASE_AUTH_DOMAIN:'FAKE_AUTH_DOMAIN',
            REACT_APP_FIREBASE_PROJECT_ID:'FAKE_PROJECT_ID',
            REACT_APP_FIREBASE_STORAGE_BUCKET:'FAKE_STORAGE_BUCKET',
            REACT_APP_FIREBASE_MESSAGING_SENDER_ID:'FAKE_MESSAGING_SENDER_ID',
            REACT_APP_FIREBASE_APP_ID:'FAKE_APP_ID'
        }
    })
    
    beforeEach(() => {
        fetch.resetMocks()
    })
    
    afterAll(() => {
        process.env = originalEnv
        fetchMock.disableMocks()
    })
    
    // test('has ')
    test('type text shows on in text fields', () => {
        render(
            <AuthProvider>
                <SignUp />
            </AuthProvider>
        )

        const firstNameInputField = screen.getByLabelText(/first name/i)
        fireEvent.change(firstNameInputField, { target: { value: testUser1.firstName }})
        expect(firstNameInputField).toHaveValue(testUser1.firstName)

        const lastNameInputField = screen.getByLabelText(/last name/i)
        fireEvent.change(lastNameInputField, { target: { value: testUser1.lastName }})
        expect(lastNameInputField).toHaveValue(testUser1.lastName)
        
        const password1InputField = screen.getByLabelText(/password/i)
        fireEvent.change(password1InputField, { target: { value: testUser1.password }})
        expect(password1InputField).toHaveValue(testUser1.password)

        const password2InputField = screen.getByLabelText(/confirm password/i)
        fireEvent.change(password2InputField, { target: { value: testUser1.password }})
        expect(password2InputField).toHaveValue(testUser1.password)

    })
    test('should not allow signup process to proceed if user types mismatched passwords', async () => {
        render(
            <AuthProvider>
                <SignUp />
            </AuthProvider>
        )

        userEvent.type(screen.getByLabelText(/first name/i), testUser1.firstName)
        userEvent.type(screen.getByLabelText(/last name/i), testUser1.lastName)
        userEvent.type(screen.getByLabelText(/email address/i), testUser1.email)
        userEvent.type(screen.getByTestId(/password1/i, testUser1.password))
        userEvent.type(screen.getByLabelText(/confirm password/i), 'wrongpassword')

        userEvent.click(screen.getByRole('button', { name: /sign up/i}))

        expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument()

    })
    test('should allow a non-registered user to sign up', async () => {
        
        fetch.mockResponseOnce(
            JSON.stringify({
                currentUser: { 
                    email: testUser1.email, 
                    uid: 1, 
                    displayName: 'Fake Name'}
            })
        )

        render(
            <AuthProvider>
                <SignUp />
            </AuthProvider>
        )

        screen.debug()

        await userEvent.type(screen.getByLabelText(/first name/i), testUser1.firstName)
        await userEvent.type(screen.getByLabelText(/last name/i), testUser1.lastName)
        await userEvent.type(screen.getByLabelText(/email address/i), testUser1.email)
        await userEvent.type(screen.getByTestId(/password1/i, testUser1.password))
        await userEvent.type(screen.getByLabelText(/confirm password/i), testUser1.password)
        
        userEvent.click(screen.getByRole('button', { name: /submit/i }))
        
        expect(fetch.mock.calls.length).toEqual(1)
        expect(await screen.findByText(/profile/i)).toBeInTheDocument()
        expect(await screen.findByText(new RegExp(testUser1.email, "i"))).toBeInTheDocument()
        expect(await screen.findByText(/date joined/i)).toBeInTheDocument()
        expect(await screen.findByLabel(/first name/i)).toHaveValue(testUser1.firstName)
        expect(await screen.findByLabel(/last name/i)).toHaveValue(testUser1.lastName)
    })

    it('should not allow a registered user to sign up', async () => {

        render(
            <AuthProvider>
                <SignUp />
            </AuthProvider>
        )

        await userEvent.type(screen.getByLabelText(/first name/i), testUser1.firstName)
        await userEvent.type(screen.getByLabelText(/last name/i), testUser1.lastName)
        await userEvent.type(screen.getByLabelText(/email address/i), testUser1.email)
        await userEvent.type(screen.getByTestId(/password1/i, testUser1.password))
        await userEvent.type(screen.getByLabelText(/confirm password/i), testUser1.password)
        
        userEvent.click(screen.getByRole('button', { name: /submit/i }))

        expect(await screen.findByText(/profile/i)).toBeInTheDocument()
        expect(await screen.findByText(new RegExp(testUser1.email, "i"))).toBeInTheDocument()
        expect(await screen.findByText(/date joined/i)).toBeInTheDocument()
        expect(await screen.findByLabel(/first name/i)).toHaveValue(testUser1.firstName)
        expect(await screen.findByLabel(/last name/i)).toHaveValue(testUser1.lastName)
    })
})