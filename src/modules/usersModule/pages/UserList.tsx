import CustomTable from '../../../components/customs/CustomTable'
import { TYPE_CONTENT } from '../../../utils/constants/enums'
import { Header, Line } from '../../../utils/constants/types'

type Props = {}

export default function UserList({ }: Props) {

    const headers: Header[] = [
        {
            title: 'Product Name',
        },
        {
            title: 'Invoice date',
        },
        {
            title: 'Status',
        }
    ]

    const lines: Line[] = [
        [
            [
                {
                    content: 'Apple Watch Series 7',
                    type: [TYPE_CONTENT.TEXT]
                },
                {
                    content: '$269',
                    type: [TYPE_CONTENT.BADGE],
                    color:'#F00'
                },
                {
                    content: '22',
                    type: [TYPE_CONTENT.TEXT]
                },
            ]
        ]
    ]
    return (
        <CustomTable headers={headers} lines={lines} />
    )
}