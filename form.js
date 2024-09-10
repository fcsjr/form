{
    "display": "form",
    "components": [
    {
        "label": "Columns",
        "columns": [
        {
            "components": [
            {
                "label": "URL da Pipeline",
                "description": "(Altere para o endereço correto do servidor)",
                "tableView": true,
                "validate": {
                "required": true
                },
                "key": "URL",
                "type": "textfield",
                "defaultValue": "https://git-infra/api/v4/projects/147/pipeline",
                "input": true
            }
            ],
            "width": 5,
            "offset": 0,
            "push": 0,
            "pull": 0,
            "size": "md",
            "currentWidth": 5
        },
        {
            "components": [
            {
                "label": "Branch da Pipeline",
                "applyMaskOn": "change",
                "disabled": true,
                "tableView": true,
                "defaultValue": "main",
                "validateWhenHidden": false,
                "key": "PIPELINE_BRANCH",
                "type": "textfield",
                "input": true
            }
            ],
            "size": "md",
            "offset": 0,
            "push": 0,
            "pull": 0,
            "currentWidth": 3,
            "width": 3
        },
        {
            "components": [
            {
                "label": "Ambiente",
                "widget": "choicesjs",
                "tableView": true,
                "data": {
                "values": [
                    {
                    "label": "test (container de testes)",
                    "value": "test"
                    },
                    {
                    "label": "prod (produção)",
                    "value": "prod"
                    }
                ]
                },
                "validate": {
                "required": true
                },
                "validateWhenHidden": false,
                "key": "BIND_NSUPDATE_ENVIRONMENT",
                "type": "select",
                "input": true,
                "defaultValue": "test"
            }
            ],
            "width": 4,
            "offset": 0,
            "push": 0,
            "pull": 0,
            "size": "md",
            "currentWidth": 4
        }
        ],
        "key": "columns1",
        "type": "columns",
        "input": false,
        "tableView": false
    },
    {
        "label": "Columns",
        "columns": [
        {
            "components": [
            {
                "label": "Habilitar prereqs",
                "widget": "choicesjs",
                "tableView": true,
                "data": {
                "values": [
                    {
                    "label": "Sim",
                    "value": "true"
                    },
                    {
                    "label": "Não",
                    "value": "false"
                    }
                ]
                },
                "validate": {
                "required": true
                },
                "key": "BIND_NSUPDATE_PREREQS",
                "type": "select",
                "input": true,
                "defaultValue": "true"
            }
            ],
            "size": "md",
            "width": 3,
            "offset": 0,
            "push": 0,
            "pull": 0,
            "currentWidth": 3
        },
        {
            "components": [
            {
                "label": "Ação",
                "widget": "choicesjs",
                "tableView": true,
                "data": {
                "values": [
                    {
                    "label": "Inserir (present)",
                    "value": "present"
                    },
                    {
                    "label": "Remover (absent)",
                    "value": "absent"
                    }
                ]
                },
                "validate": {
                "required": true
                },
                "key": "BIND_NSUPDATE_ACTION",
                "type": "select",
                "input": true
            }
            ],
            "width": 3,
            "offset": 0,
            "push": 0,
            "pull": 0,
            "size": "md",
            "currentWidth": 3
        },
        {
            "components": [
            {
                "label": "Zona",
                "widget": "choicesjs",
                "tableView": true,
                "data": {
                "values": [
                    { "label":"teste.gov.br", "value":"teste.gov.br"},
                    { "label":"sei.gov.br", "value":"sei.gov.br"},
                ]
                },
                "validate": {
                "required": true
                },
                "validateWhenHidden": false,
                "key": "BIND_NSUPDATE_ZONE",
                "type": "select",
                "input": true
            }
            ],
            "width": 6,
            "offset": 0,
            "push": 0,
            "pull": 0,
            "size": "md",
            "currentWidth": 6
        }
        ],
        "key": "columns",
        "type": "columns",
        "input": false,
        "tableView": false
    },
    {
        "label": "Registros",
        "tableView": false,
        "redrawOn": "data",
        "rowDrafts": false,
        "key": "BIND_NSUPDATE_LIST",
        "type": "editgrid",
        "displayAsTable": false,
        "input": true,
        "validate": {
        "custom": "distinct_keys = _.uniqBy(input, item => item.fqdn + '/' + item.type + '/' + item.value); if (input.length == 0){ valid = 'Deve haver ao menos 1(um) registro.';} else if (input.length > distinct_keys.length) { valid = 'Registros repetidos informados.';} else {valid = true;}"
        },
        "components": [
        {
            "label": "Columns",
            "columns": [
            {
                "components": [
                {
                    "label": "Entrada",
                    "applyMaskOn": "change",
                    "tableView": true,
                    "persistent": false,
                    "case": "lowercase",
                    "validate": {
                    "required": true,
                    "pattern": "^(_?[0-9a-z\\-]+?[\\.0-9a-z\\-]*?\\.?|@)$",
                    "minLength": 1
                    },
                    "key": "record",
                    "type": "textfield",
                    "input": true
                },
                {
                    "label": "Record",
                    "calculateValue": "// o fqdn será a propria zona\nif ( (!(row.record)) || row.record == '' || row.record == '@') { \n  value = data.BIND_NSUPDATE_ZONE + '.';\n}\n// o fqdn será exatamente o que foi inserido na entrada\nelse if ( (row.record).endsWith('.') ) {\n  value = row.record;\n}\n// o fqdn será entrada + zona\nelse {\n  value = row.record + '.' + data.BIND_NSUPDATE_ZONE + '.';\n}",
                    "key": "fqdn",
                    "type": "hidden",
                    "input": true,
                    "tableView": false
                }
                ],
                "width": 4,
                "offset": 0,
                "push": 0,
                "pull": 0,
                "size": "md",
                "currentWidth": 4
            },
            {
                "components": [
                {
                    "label": "Tipo",
                    "widget": "choicesjs",
                    "tableView": true,
                    "data": {
                    "values": [
                        { "label": "A", "value": "A" },
                        { "label": "AAAA", "value": "AAAA" },
                        { "label": "TXT", "value": "TXT" },
                        { "label": "PTR", "value": "PTR" },
                        { "label": "CNAME", "value": "CNAME" },
                        { "label": "MX", "value": "MX" },
                        { "label": "NS", "value": "NS" }
                    ]
                    },
                    "defaultValue": "A",
                    "validate": {
                    "required": true
                    },
                    "key": "type",
                    "type": "select",
                    "input": true
                }
                ],
                "width": 2,
                "offset": 0,
                "push": 0,
                "pull": 0,
                "size": "md",
                "currentWidth": 2
            },
            {
                "components": [
                {
                    "label": "Valor",
                    "applyMaskOn": "change",
                    "tableView": true,
                    "validate": {
                    "required": true
                    },
                    "validateWhenHidden": false,
                    "key": "value",
                    "type": "textfield",
                    "input": true
                }
                ],
                "size": "md",
                "width": 2,
                "offset": 0,
                "push": 0,
                "pull": 0,
                "currentWidth": 2
            },
            {
                "components": [
                {
                    "label": "Comentário",
                    "applyMaskOn": "change",
                    "tableView": true,
                    "validate": {
                    "required": true
                    },
                    "key": "comment",
                    "type": "textfield",
                    "input": true
                }
                ],
                "size": "md",
                "width": 3,
                "offset": 0,
                "push": 0,
                "pull": 0,
                "currentWidth": 3
            },
            {
                "components": [
                {
                    "label": "TTL",
                    "applyMaskOn": "change",
                    "mask": false,
                    "tableView": false,
                    "defaultValue": 300,
                    "delimiter": false,
                    "requireDecimal": false,
                    "inputFormat": "plain",
                    "truncateMultipleSpaces": false,
                    "validateWhenHidden": false,
                    "key": "ttl",
                    "type": "number",
                    "input": true
                }
                ],
                "size": "md",
                "width": 1,
                "offset": 0,
                "push": 0,
                "pull": 1,
                "currentWidth": 1
            }
            ],
            "key": "columns",
            "type": "columns",
            "input": false,
            "tableView": false
        }
        ]
    },
    {
        "label": "Token Privado do Usuário",
        "applyMaskOn": "change",
        "tableView": true,
        "validate": {
        "required": true
        },
        "key": "GITLAB_PRIVATE_TOKEN",
        "type": "password",
        "input": true
    },
    {
        "label": "HR",
        "tag": "hr",
        "refreshOnChange": false,
        "type": "htmlelement",
        "input": false,
        "tableView": false,
        "key": ""
    },
    {
        "key": "submit",
        "type": "button",
        "label": "Enviar",
        "action": "submit",
        "disableOnInvalid": true,
        "showValidations": false,
        "tableView": false,
        "input": true
    }
    ]
}
