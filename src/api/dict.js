import request from '@/utils/request'
import qs from 'qs'

export function fetchList(query) {
  return request({
    url: '/dict/list',
    method: 'get',
    params: query
  })
}

export function addDictType(data) {
  return request({
    url: '/dict/add',
    method: 'post',
    data: qs.stringify(data)
  })
}

export function updateDictType(data) {
  return request({
    url: '/dict/update',
    method: 'post',
    data: qs.stringify(data)
  })
}

export function deleteDictType(id) {
  return request({
    url: '/dict/delete/' + id,
    method: 'get'
  })
}

export function fetchDataList(query) {
  return request({
    url: '/dict/data/list',
    method: 'get',
    params: query
  })
}

export function addDictData(data) {
  return request({
    url: '/dict/data/add',
    method: 'post',
    data: qs.stringify(data)
  })
}

export function updateDictData(data) {
  return request({
    url: '/dict/data/update',
    method: 'post',
    data: qs.stringify(data)
  })
}

export function deleteDictData(id) {
  return request({
    url: '/dict/data/delete/' + id,
    method: 'get'
  })
}

export function getDictDataByType(type) {
  return request({
    url: '/dict/data/' + type,
    method: 'get'
  })
}

