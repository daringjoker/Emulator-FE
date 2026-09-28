from tornado.wsgi import WSGIContainer
from tornado.httpserver import HTTPServer
from tornado.ioloop import IOLoop
import webbrowser
from app import app

http_server = HTTPServer(WSGIContainer(app))
http_server.listen(5000)
webbrowser.open("http://127.0.0.1:5000",new=1)
IOLoop.instance().start()