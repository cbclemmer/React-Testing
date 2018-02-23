import * as $ from 'jquery'
import * as toastr from 'toastr'

export async function post(url: string, data: any): Promise<any> {
  try {
    const d = await new Promise((res, rej) => {
      $.ajax({
        url,
        data: JSON.stringify(data),
        type: 'POST',
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
