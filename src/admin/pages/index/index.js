import React from 'react'
import { Route } from 'react-router-dom'

import Layout from '../../layout/Layout';
import Header from '../../layout/header/Header';
import Aside from '../../layout/aside/Aside';

import Welcome from '../welcome/Welcome';
import Students from '../students/Students';
import StudentAdd from '../students/StudentAdd';
import StudentDetail from '../students/StudentDetail';

import Courses from '../courses/Courses';
import './admin.css'

export default function Admin() {
  console.log('admin component')
  return (
    <Layout
      header={<Header />}
      aside={<Aside />}
    >
      <React.Fragment>
        <Route path='/' exact component={Welcome} />
        <Route path='/students' exact component={Students} />
        <Route path='/students/add' exact component={StudentAdd} />
        <Route path='/students/:id(\d+)' exact component={StudentDetail} />
        <Route path='/courses' exact component={Courses} />
      </React.Fragment>
    </Layout>
  )
}
