from app import create_app

app = create_app()

if __name__ == '__main__':

    """
        debug = false for productions
    """

    app.run(debug = True, host = 'localhost', port = 8080)    # local machine
    # app.run(debug = True, host = '0.0.0.0', port = 5000)    # multiple device