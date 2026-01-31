from sqlalchemy import create_engine
engine = create_engine(f"{os.environ["DB_DIALECT"]}://{os.environ["DB_USER"]}:{os.environ["DB_PASSWORD"]}@{os.environ["DB_ENDPOINT"]}/{os.environ["DB_NAME"]}")
