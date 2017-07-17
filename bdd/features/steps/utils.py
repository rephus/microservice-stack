
def assert_response(response, code=None, additional_text_on_error=''):
    valid_code = response.status_code < 300
    exact_code = response.status_code == code if code else True

    text = response.text
    # If response is a HTMl, we filter only the pastebin content (inside textarea)
    if 'DOCTYPE' in text:
        import re
        regex = re.search(r'<textarea.*textarea>', text,re.M|re.I|re.DOTALL)
        text = regex.group() if regex else text

    assert (exact_code and valid_code), \
        "Request to {} got code {}. {}Text: {}".format(
            response.url,
            response.status_code,
            additional_text_on_error,
            text,
        )

#unittest syntax
def assertEqual(value, expected, msg=""):
    assert value == expected, "value != expected. {}".format(msg)
