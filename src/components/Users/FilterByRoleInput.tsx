import { FormControl, FormLabel, InputGroup, Select } from "@chakra-ui/react";
import React from "react";
import { useTranslation } from "react-i18next";

type Props = {
  onSelectRole: (role: string) => void;
};

const FilterByRoleInput: React.FC<Props> = ({ onSelectRole }) => {
  const { t } = useTranslation();

  return (
    <InputGroup maxW="xs">
      <FormControl>
        <FormLabel>{t("users.filter_by_role")}</FormLabel>
        <Select onChange={(event) => onSelectRole!(event.target.value)}>
          <option value={undefined}>{t("users.all")}</option>
          <option value="client">Client</option>
          <option value="driver">{t("users.driver")}</option>
          <option value="registration">
            {t("users.registration_manager")}
          </option>
          <option value="conflict">{t("users.conflict_manager")}</option>
        </Select>
      </FormControl>
    </InputGroup>
  );
};

export default FilterByRoleInput;
