import http.server
import socketserver

PORT = 8000

class Handler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/' or self.path == '':
            self.path = '/index.html'
        return http.server.SimpleHTTPRequestHandler.do_GET(self)

class ReuseTCPServer(socketserver.TCPServer):
    allow_reuse_address = True

if __name__ == "__main__":
    with ReuseTCPServer(("", PORT), Handler) as httpd:
        print(f"Serving portfolio on http://localhost:{PORT}")
        httpd.serve_forever()
