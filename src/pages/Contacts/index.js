import { useState, useEffect } from 'react'

export function Contacts() {
	const [contacts, setContacts] = useState([])
	const [isLoading, setIsLoading] = useState(false)
	const [isError, setIsError] = useState(false)

	useEffect(() => {
        setIsLoading(true)
		fetch('https://randomuser.me/api/?esults=200')
			.then((response) => response.json())
			.then((data) => {
				setContacts(data.results)
				setIsLoading(false)
			})
			.catch(() => {
				setIsLoading(false)
				setIsError(true)
			})
        }, [])

	if (isLoading) {
		return <div>...loading</div>
	}

	if (isError) {
		return <div>...error</div>
	}
	return <h1>Hello</h1>
}
