import { createStyles } from '@mantine/styles'

const useStyles = createStyles((theme) => ({
    header:{
        backgroundColor: theme.colorScheme === 'dark' ? '#072c33' : '#072f37',
        

        border: 0,
    },
}))

export default useStyles
