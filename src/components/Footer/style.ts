import { createStyles } from '@mantine/styles'

const useStyles = createStyles((theme) => ({

  footer: {
      height: 50
    },
  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'column',
    paddingTop: 10
  },
}))

export default useStyles
