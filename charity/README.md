POST
Authorization: Bearer
/api/restricted
Json:
{
"donated_at": int,
"amount": int,
"purpose": json,
"source": enum ['web_dev', 'dozbrajamy']
}
