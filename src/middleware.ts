import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const loginUrl = new URL('', request.url)

  // Convert the request URL string into a URL object
  const requestUrl = new URL(request.url)

  // Access the pathname property on the URL object
  if (requestUrl.pathname.includes('')) {
    return NextResponse.next()
  }

  return NextResponse.redirect(loginUrl)
}
