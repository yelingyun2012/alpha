import axios from './http'

export function Category (params) {
  return axios.post('Category.ashx', params)
}

export function ShopsBJ (params) {
  return axios.post('ShopsBJ.ashx', params)
}

export function UpLoad (url, params) {
  return axios.post(url, params)
}

export function basicCategory (params) {
  return axios.post('Category.ashx', params)
}

export function GoodsBaseData (params) {
  return axios.post('GoodsBaseData.ashx', params)
}

export function GoodsCategory (params) {
  return axios.post('Category.ashx', params)
}

export function CategorySku (params) {
  return axios.post('Sku.ashx', params)
}

export function brandCategory (params) {
  return axios.post('Category.ashx', params)
}

export function brandSku (params) {
  return axios.post('Sku.ashx', params)
}

export function rangCategory (params) {
  return axios.post('Category.ashx', params)
}

export function PriceZone (params) {
  return axios.post('PriceZone.ashx', params)
}

export function brandRangCategory (params) {
  return axios.post('Category.ashx', params)
}

export function brandPriceZone (params) {
  return axios.post('PriceZone.ashx', params)
}

export function GetCategorySupplier (params) {
  return axios.post('Supplier.ashx', params)
}

export function GetSupplierGoods (params) {
  return axios.post('Supplier.ashx', params)
}

export function query (params) {
  return axios.post('User.ashx', params)
}

export function rStatic (params) {
  return axios.post('User.ashx', params)
}

export function qId (params) {
  return axios.post('User.ashx', params)
}

export function Feedback (params) {
  return axios.post('Feedback.ashx', params)
}

export function AddFeedback (params) {
  return axios.post('Feedback.ashx', params)
}

export function messageShopsBJ (params) {
  return axios.post('ShopsBJ.ashx', params)
}

export function GetTendencys (params) {
  return axios.post('ShopsBJ.ashx', params)
}