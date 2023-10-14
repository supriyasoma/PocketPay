package com.pocketpay.businessservice.dto;
import com.pocketpay.businessservice.entity.SubCategory;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SubCategoryDto {

    private int id;
    private String name;
    @Autowired
    public static ModelMapper modelMapper;

    static{
        modelMapper=new ModelMapper();
    }

    public static SubCategory SubConvertDtoToEntity(SubCategoryDto subcategoryDto){
        modelMapper.getConfiguration()
                .setMatchingStrategy(MatchingStrategies.LOOSE);
        return modelMapper.map(subcategoryDto, SubCategory.class);
    }

    public static SubCategoryDto SubConvertEntityToDto(SubCategory subcategory){
        modelMapper.getConfiguration()
                .setMatchingStrategy(MatchingStrategies.LOOSE);
        return modelMapper.map(subcategory, SubCategoryDto.class);
    }
}