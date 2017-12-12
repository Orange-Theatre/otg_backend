# -*- coding: utf-8 -*-
# Copyright 2016, 2017 Openworx
# License LGPL-3.0 or later (http://www.gnu.org/licenses/lgpl.html).

{
    "name": "Orange Theatre Backend",
    "summary": "Odoo 10.0 backend theme for Orange Theatre",
    "version": "10.0.1.0.1",
    "category": "Themes/Backend",
	"description": """
		Backend theme for Orange Theatre.
    """,
	'images':[
	],
    "author": "Matthew Watkins",
    "license": "LGPL-3",
    "installable": True,
    "data": [
        'views/assets.xml',
        'views/res_company_view.xml',
        'views/search_button.xml',
    ],
    "depends": [
	   'web_responsive',
    ],
    "qweb": [
    'static/src/xml/templates.xml',
    ],
}

