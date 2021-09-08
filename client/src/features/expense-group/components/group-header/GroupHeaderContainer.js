import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { GroupHeader as GroupHeaderComponent } from './GroupHeader';
import { setCurrentGroupId } from 'src/appSlice';

export function GroupHeaderContainer(props) {
  const dispatch = useDispatch();

  const changeGroup = (id) => {
    // TODO: remove this hack
    props.history.push(`/group/${id}`);

    dispatch(setCurrentGroupId({ groupId: id }));
  }

  return GroupHeaderComponent({ ...props, changeGroup });
}

export const GroupHeader = withRouter(GroupHeaderContainer);
