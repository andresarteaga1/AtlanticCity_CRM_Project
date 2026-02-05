import pymysql

# 1. Le decimos a Django que use pymysql
pymysql.install_as_MySQLdb()

# 2. EL PARCHE: Forzamos la versión para que Django no se queje
import MySQLdb
if hasattr(MySQLdb, 'version_info'):
    # Mentimos diciendo que somos la versión 2.2.1 Final
    MySQLdb.version_info = (2, 2, 1, 'final', 0)
    MySQLdb.__version__ = '2.2.1'