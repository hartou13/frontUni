import React from 'react'
import { CSVLink } from 'react-csv'
import axios from 'axios'
import URLHelper from '../Helper/URLHelper'
// import { Data, sclistProps } from '../types'
import { useState, useEffect } from 'react'
import {
 
  Toast,
  ToastContainer,
  Spinner,
} from 'react-bootstrap'

const CsvExport = ({ url, modele }) => {
  const [data, setData] = useState([])
  const [csvHeaders, setCsvHeaders] = useState([])
  const [loading, setLoading] = useState(false)

  const [message,setMessage]=useState();

  const [showToast, setShowToast] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`${URLHelper.urlgen(url)}`)
        setData(response.data.data)
        setCsvHeaders(getHeaders(response.data.data))
        setLoading(false)
      } catch (error) {
        console.log(error)
        setShowToast(true)
        setMessage(JSON.stringify(error))
        setLoading(false)

      }
    }

    fetchData()
  }, [url])

  const getHeaders = (dataArray) => {
    const headers = Object.keys(dataArray[0]).map((key) => ({
      label: key.toString(),
      key,
    }))
    return headers
  }

  return (
    <>
      <ToastContainer position="top-end" className="p-3 text-light">
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={6000}
          autohide
          bg={'danger'}
        >
          <Toast.Header>
            <strong className="me-auto">Message!</strong>
            <small>Just now</small>
          </Toast.Header>
          <Toast.Body>{message}</Toast.Body>
        </Toast>
      </ToastContainer>
    <CSVLink
      enclosingCharacter=''
      data={data}
      filename={`${modele}.csv`}
      headers={csvHeaders}
      asyncOnClick={true}
    >
      {loading ? 'Chargement csv...' : 'Telecharger csv'}
    </CSVLink>
    </>
  )
}

export default CsvExport
