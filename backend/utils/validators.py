def validate_registration(data):
    required = ['username', 'password', 'location']
    return all(data.get(field) for field in required)
