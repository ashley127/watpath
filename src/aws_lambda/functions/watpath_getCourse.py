import json
import boto3

def lambda_handler(event, context):
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('watpath')
    
    # Initialize the scan parameters
    scan_kwargs = {
        'Limit': 100
    }
    
    # Check if there's a LastEvaluatedKey from the previous invocation
    if 'last_evaluated_key' in event:
        scan_kwargs['ExclusiveStartKey'] = event['last_evaluated_key']
    
    response = table.scan(**scan_kwargs)
    items = response.get('Items', [])
    
    # Check if there are more items to scan
    last_evaluated_key = response.get('LastEvaluatedKey', None)
    
    # Return the scanned items and the last evaluated key (if any)
    return {
        'statusCode': 200,
        'body': json.dumps({
            'items': items,
            'last_evaluated_key': last_evaluated_key
        })
    }
