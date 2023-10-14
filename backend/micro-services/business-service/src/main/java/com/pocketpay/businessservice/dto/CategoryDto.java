package com.pocketpay.businessservice.dto;

import com.pocketpay.businessservice.entity.Category;
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
public class CategoryDto {

    private int id;
    private String name;
    @Autowired
    public static ModelMapper modelMapper;

    static{
        modelMapper=new ModelMapper();
    }

    public static Category CatConvertDtoToEntity(CategoryDto categoryDto){
        modelMapper.getConfiguration()
                .setMatchingStrategy(MatchingStrategies.LOOSE);
        return modelMapper.map(categoryDto, Category.class);
    }

    public static CategoryDto CatConvertEntityToDto(Category category){
        modelMapper.getConfiguration()
                .setMatchingStrategy(MatchingStrategies.LOOSE);
        return modelMapper.map(category,CategoryDto.class);
    }
}

