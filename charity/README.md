POST
Authorization: Bearer
/api/restricted
Json:
{
"donated_at": int,
"amount": int,
"purpose": {
link: string,
description: string
},
"source": enum ['web_dev', 'dozbrajamy']
}
