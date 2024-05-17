import React, { useEffect, useState } from 'react'
import qs from 'query-string';
import StudentsSearchBar from './StudentsSearchBar';
import { searchStudents } from '../../services/students';

// 1. 通过URL的query存储查询条件
// 2. 查询条件的改变将会影响到URL的query

function getUrlQuery(search) {
  const queryDefault = {
    key: '',
    sex: -1,
    page: 1,
    limit: 10
  }
  const query = Object.assign({}, queryDefault, qs.parse(search))
  query.sex = +query.sex
  query.page = +query.page
  query.limit = +query.limit
  return query
}

// 设置URL的search
function setUrlQuery(history, search) {
  const str = qs.stringify(search)

  // 在向历史记录插入一个新的条目时，React会重新渲染当前组件。
  history.push('?' + str)
}

function useStudents(query) {
  const [list, setList] = useState([])

  useEffect(() => {
    searchStudents(
      query
    ).then(response => {
      setList(response)
    })
  }, [query.key, query.sex, query.page, query.limit])

  return list
}

export default function Students(props) {
  const query = getUrlQuery(props.location.search)
  const students = useStudents(query)

  const liElements = students.map((item, key) => {
    return <li key={key}>{`id: ${item.id}, name: ${item.name}`}, <a href={'/students/' + item.id}>View</a></li>
  })

  return (
    <div>
      <StudentsSearchBar defaultValue={query} onSearch={(query) => {
        const newQuery = {
          ...query,
          key: query.key,
          sex: query.sex
        }
        setUrlQuery(props.history, newQuery)
      }} />
      <ul>
        { liElements }
      </ul>
    </div>
  )
}
