import { useEffect, useState } from "react"

export const useGetContacts = (nationality = null) => {
	const [isLoading, setIsLoading] = useState(true)
	const [isError, setIsError] = useState(false)
	const [data, setData] = useState([])

	const getRequestParam = () => {
		let RequestParam = `nat=`
		if (nationality) {
			for (let key in nationality) {
				RequestParam += nationality[key] + ','
			}
		}
		RequestParam += '&'
		return ''
	}
	useEffect(() => {
		const getContacts = async () => {
			setIsLoading(true)
			try {
				const response = await fetch('https://randomuser.me/api/?results=10' + getRequestParam())
				const { results, error } = await response.json()
				if (error) {
					throw new Error(error)
				} else {
					setData(results)
					setIsError(false)
				}
			} catch(e) {
				setIsError(true)
				console.log('Ошибка при загрузке даных: ', e)
			} finally {
				setIsLoading(false)
			}
		}
		getContacts()
	}, [])

	return {
		data,
		isError,
		isLoading,
	}
}