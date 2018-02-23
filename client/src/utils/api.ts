import * as $ from 'jquery'
import * as toastr from 'toastr'
import { method } from 'bluebird';

enum Method {
  POST = 'POST',
  GET = 'GET'
}

async function ajax(type: Method, url: string, data?: any): Promise<any> {
  try {
    const d = await new Promise((res, rej) => {
      $.ajax({
        url,
        data: JSON.stringify(data),
        type,
        contentType: 'application/json',
        dataType: 'JSON'
      })
      .done((response) => {
        if (response.error) {
          toastr.error(response.error)
        }
        res(response)
      })
      .fail((e) => rej(e))
    })
    return d
  } catch (e) {
    console.error('API error')
    console.error(e)
    return false
  }
}

export function post(url: string, data?: any): Promise<any> {
  return ajax(Method.POST, url, data)
}

export function get(url: string, data?: any): Promise<any> {
  return ajax(Method.GET, url, data)
}
