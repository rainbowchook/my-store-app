import {useParams} from 'react-router-dom'

const CategoryDetail = () => {
  const {id} = useParams()
  return (
    <div>CategoryDetail for {id}</div>
  )
}

export default CategoryDetail