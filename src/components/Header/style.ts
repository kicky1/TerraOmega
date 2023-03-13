import { createStyles } from '@mantine/styles'

const useStyles = createStyles((theme) => ({

    headerContainer:{
        backgroundColor: '#072f37',
        border: 0,
      },

    link: {
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        paddingLeft: theme.spacing.md,
        paddingRight: theme.spacing.md,
        textDecoration: 'none',
        color: theme.colorScheme !== 'dark' ? theme.white : theme.black,
        fontWeight: 500,
        fontSize: theme.fontSizes.md,
        borderRadius: theme.radius.xs,

        ...theme.fn.hover({
        color: theme.colorScheme !== 'dark' ? theme.colors.gray[4] : '#06272e',
        }),
    },


    header:{
        backgroundColor: '#072f37',
        border: 0,
    },


}))

export default useStyles
