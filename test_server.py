import sys
import BaseHTTPServer

from SimpleHTTPServer import SimpleHTTPRequestHandler

Handler = SimpleHTTPRequestHandler
Server  = BaseHTTPServer.HTTPServer
Protocol = "HTTP/1.0"
port = 8000

if sys.argv[1:]:
    port = int(sys.argv[1])

server_address = ('127.0.0.1', port)

Handler.protocol_version = Protocol

httpd = Server(server_address, Handler) 

socket_name = httpd.socket.getsockname()

print "Serving HTTP on", socket_name[0], "port", socket_name[1], "..."

httpd.serve_forever()