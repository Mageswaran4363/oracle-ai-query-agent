import pandas as pd
import oracledb
import oci

from oci.generative_ai_inference import GenerativeAiInferenceClient
from oci.generative_ai_inference.models import (
    ChatDetails,
    CohereChatRequest,
    OnDemandServingMode
)

# =====================================
# CONFIGURATION
# =====================================

TENANCY_OCID = "ocid1.tenancy.oc1..aaaaaaaav5kfvbst4fohct22k3iquvtpoe4oopjnulkeljnrurl2nykzbh6a"

MODEL_ID ="ocid1.generativeaimodel.oc1.uk-london-1.amaaaaaask7dceyahudlskps3vqcrwiaylpyebnlcyzrryqr3prhwpffchga"

DB_USER = "ADMIN"
DB_PASSWORD = "Hackathon123@"

WALLET_DIR = "./wallet"
DB_SERVICE = "hackdb_low"

# =====================================
# OCI GEN AI CONNECTION
# =====================================

config = oci.config.from_file()

client = GenerativeAiInferenceClient(
    config=config,
    service_endpoint="https://inference.generativeai.uk-london-1.oci.oraclecloud.com"
)

# =====================================
# ORACLE DATABASE CONNECTION
# =====================================

import os

os.environ["TNS_ADMIN"] = WALLET_DIR

def get_connection():

    conn = oracledb.connect(
        user=DB_USER,
        password=DB_PASSWORD,
        dsn=DB_SERVICE,
        config_dir=WALLET_DIR,
        wallet_location=WALLET_DIR,
        wallet_password=DB_PASSWORD
    )

    return conn
# =====================================
# SQL GENERATION
# =====================================

def generate_sql(question):

    schema = """
    Table: SUPERSTORE

    Columns:
    CATEGORY
    CITY
    COUNTRY
    CUSTOMER_ID
    CUSTOMER_NAME
    DISCOUNT
    MARKET
    ORDER_DATE
    ORDER_ID
    ORDER_PRIORITY
    PRODUCT_ID
    PRODUCT_NAME
    PROFIT
    QUANTITY
    REGION
    ROW_ID
    SALES
    SEGMENT
    SHIP_DATE
    SHIP_MODE
    SHIPPING_COST
    STATE
    SUB_CATEGORY
    YEAR
    MARKET2
    WEEKNUM
    """

    prompt = f"""
    You are an Oracle SQL assistant.

    Database Schema:

    {schema}

    Rules:
    - Generate Oracle SQL only
    - Use only listed columns
    - Only SELECT statements
    - No explanations
    - No markdown
    - No code fences
    - Return SQL only

    Question:
    {question}
    """

    chat_request = CohereChatRequest(
        message=prompt,
        max_tokens=300,
        temperature=0,
        is_stream=False
    )

    chat_detail = ChatDetails(
        compartment_id=TENANCY_OCID,
        serving_mode=OnDemandServingMode(
            model_id=MODEL_ID
        ),
        chat_request=chat_request
    )

    response = client.chat(chat_detail)

    sql = response.data.chat_response.text

    sql = sql.replace("```sql", "")
    sql = sql.replace("```", "")
    sql = sql.strip()
    sql = sql.rstrip(";")

    return sql

# =====================================
# DATABASE QUERY
# =====================================
def ask_database(question):

    conn = get_connection()
    cursor = conn.cursor()

    sql = generate_sql(question)

    cursor.execute(sql)

    rows = cursor.fetchall()

    columns = [col[0] for col in cursor.description]

    df = pd.DataFrame(rows, columns=columns)

    cursor.close()
    conn.close()

    return df